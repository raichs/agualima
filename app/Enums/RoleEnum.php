<?php

namespace App\Enums;

enum RoleEnum: string
{
    case ADMINISTRATOR = 'administrador';
    case MANAGEMENT = 'gerencia';
    case CROP_MANAGER = 'responsable_de_cultivo';
    case VIEWER = 'visualizador';
}
