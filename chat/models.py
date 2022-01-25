from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Thread(models.Model):
    sender = models.ForeignKey(User,  on_delete=models.CASCADE,  related_name="+")
    reciever =  models.ForeignKey(User,  on_delete=models.CASCADE,  related_name="+")
    room = models.CharField(max_length=200, blank=True, null=True)
    
    def __str__(self):
        return "{}".format(self.sender.username)
    
class Messages(models.Model):
    thread = models.ForeignKey(Thread,  on_delete=models.CASCADE,  related_name="message")
    body = models.CharField(max_length=1000,  blank=True, null=True)
    timestamp = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return "{}".format(self.thread.id)
    
