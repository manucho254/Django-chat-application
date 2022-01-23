from django.db import models
from django.template.defaultfilters import slugify
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Profile(models.Model):
    user = models.OneToOneField(User, primary_key=True, verbose_name='user', related_name='profile',  on_delete=models.CASCADE)
    profile_slug = models.SlugField(max_length=200, blank=True, null=True)
    profile_image = models.ImageField(upload_to="profile_images/",  default="media/images/default.jpg", blank=True)
    profile_created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "{}".format(self.user)
    
    def save(self, *args, **kwargs):
        self.profile_slug = slugify(self.user)
        super(Profile, self).save(*args, **kwargs)
    
@receiver(post_save, sender=User) 
def create_profile(sender,  instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User) 
def save_profile(sender,  instance, **kwargs):
    instance.profile.save()
