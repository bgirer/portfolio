import json

from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.core.urlresolvers import reverse_lazy
from django.http import JsonResponse
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.views import generic

from portfolio.forms import SmallContactForm


class TemplateWithFormView(generic.TemplateView):
    def get_context_data(self, **kwargs):
        context = super(TemplateWithFormView, self).get_context_data()
        context['form'] = SmallContactForm
        return context


class SmallContactFormView(generic.FormView):
    form_class = SmallContactForm
    success_url = reverse_lazy('small-form')

    def form_valid(self, form):
        obj = form.cleaned_data

        customer_content = render_to_string('emails/small_contact_external.html', {
            'first_name': obj['first_name'],
            'last_name': obj['last_name'],
            'email': obj['email'],
            'message': obj['message'],
        })
        customer_text_content = strip_tags(customer_content)
        # Subject, Content, EmailFrom, EmailTo, ReplyTo
        customer_email = EmailMultiAlternatives(
                u'Thanks for contacting Brian!',
                customer_text_content,
                settings.DEFAULT_FROM_EMAIL, [obj['email']],
                headers={'Reply-To': settings.DEFAULT_FROM_EMAIL})
        customer_email.attach_alternative(customer_content, 'text/html')
        customer_email.send()

        our_content = render_to_string('emails/small_contact_internal.html', {
            'first_name': obj['first_name'],
            'last_name': obj['last_name'],
            'email': obj['email'],
            'message': obj['message'],
        })
        our_text_content = strip_tags(our_content)
        # Subject, Content, EmailFrom, EmailTo, ReplyTo
        our_email = EmailMultiAlternatives(
                u'Contact request from adudenamedbrian.com', our_text_content,
                settings.DEFAULT_FROM_EMAIL, [settings.DEFAULT_FROM_EMAIL],
                headers={'Reply-To': obj['email']})
        our_email.attach_alternative(our_content, 'text/html')
        our_email.send()
        return JsonResponse({'message': 'success'})

    def form_invalid(self, form):
        return JsonResponse(status=400, data={'message': 'error',
                                              'errors': json.loads(
                                                      form.errors.as_json())})


# # HTTP ERROR VIEWS
# def bad_request(request):
#     response = render_to_response('error/400.html', context=RequestContext(request))
#     response.status_code = 400
#     return response
#
#
# def permission_denied(request):
#     response = render_to_response('error/403.html', context=RequestContext(request))
#     response.status_code = 403
#     return response
#
#
# def page_not_found(request):
#     response = render_to_response('error/404.html', context=RequestContext(request))
#     response.status_code = 404
#     return response
#
#
# def server_error(request):
#     response = render_to_response('error/500.html', context=RequestContext(request))
#     response.status_code = 500
#     return response
