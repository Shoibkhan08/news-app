from django.db import models
from django.contrib.auth.models import User

def upload_path(instance, filname):
    return '/'.join(['img', str(instance.text), filname])


class Articles(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField(max_length=200)
    photo = models.ImageField(upload_to=upload_path ,blank=True,null=True)
    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.user.username} - {self.text[:10]}'


    
    


