from django import forms


class SmallContactForm(forms.Form):
    """
    Mini-contact form for CTA modals
    """
    first_name = forms.CharField(label='First name*')
    last_name = forms.CharField(label='Last name*')
    email = forms.EmailField(label='Email address*')
    message = forms.CharField(widget=forms.Textarea(
            attrs={'rows': 4,
                   'placeholder': 'What would you like to chat about?'}),
            label='', required=False)
