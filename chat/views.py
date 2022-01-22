from django.shortcuts import render
from django.views.generic import View

class HomeView(View):
    def get(self,  request,  *args,  **kwargs):
        return render(request, "index.html",  {})
    
class RoomView(View):
    def get(self, request, room_name, *args,  **kwargs):
        return render(request, 'room.html', {
            'room_name': room_name
        })
