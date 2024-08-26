from django.urls import path
from . import views

urlpatterns = [
    path("articles/", views.ArticlesListView.as_view() ,name="aticles"),
    path("articlesDeleteUpdate/<int:pk>/", views.ArticlesDetailView.as_view() ,name="aticlesDetail"),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.LoginTokenView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
]