from django.urls import path,include
from . import views

urlpatterns = [
    path('', views.HomeView.as_view(),  name="home"),
    path('<str:room_name>/', views.RoomView.as_view(), name='room'),
]
