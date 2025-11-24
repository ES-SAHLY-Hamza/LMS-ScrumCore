from django.urls import path
from collaborateurs.views import CollaborateurMockView, DemandesManagerView, MesDemandesView, formations_list, LoginMockView, DemanderFormationView,ManagerValidationView, DemandesRHView, RHValidationView
from django.urls import path, include

urlpatterns = [
    path('collaborateurs/', CollaborateurMockView.as_view(), name='collaborateurs-mock'),
    path('formations/', formations_list, name='formations-list'),
    path('login/', LoginMockView.as_view(), name='login-mock'),
    path("api/formations/", formations_list, name="formations"),
    path("formations/demander/", DemanderFormationView.as_view(), name="demander_formation"),
    path("api/collaborateurs/", CollaborateurMockView.as_view(), name="collaborateurs"),
    path("api/login/", LoginMockView.as_view(), name="login"),

    path('formation/demander/', DemanderFormationView.as_view(), name='demander'),
    path('mes-demandes/', MesDemandesView.as_view(), name='mes-demandes'),
    path('manager/demandes/', DemandesManagerView.as_view(), name='demandes-manager'),
    path('manager/demandes/valider/', ManagerValidationView.as_view(), name='demandes-valider'),


    path('rh/demandes/', DemandesRHView.as_view(), name='demandes-rh'),
    path('rh/demandes/valider/', RHValidationView.as_view(), name='demandes-rh-valider'),
    #path('api/', include('collaborateurs.urls')),
]
