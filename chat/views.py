from django.shortcuts import render
from django.views.generic import View
from django.contrib.auth.mixins import LoginRequiredMixin
from accounts.models import Profile

class LandingPageView(View):
    def get(self, request,  *args, **kwargs):
        return render(request,  'landing_page.html',  {})

class HomeView(LoginRequiredMixin, View):
    def get(self,  request,  *args,  **kwargs):
        profiles = Profile.objects.all()
        context = {
            "profiles": profiles
        }
        return render(request, "index.html",  context)
    
class RoomView(LoginRequiredMixin, View):
    def get(self, request, room_name, *args,  **kwargs):
        context = {
            "room_name": room_name
        }
        return render(request, 'room.html', context)
