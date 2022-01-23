from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from chat.views import  LandingPageView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('chat/',  include('chat.urls')),
    path('',  LandingPageView.as_view()),
    path('accounts/', include('allauth.urls')),
]
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
