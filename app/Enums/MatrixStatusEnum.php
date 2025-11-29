<?php

namespace App\Enums;

enum MatrixStatusEnum: string
{
    case DRAFT = 'draft';
    case ACTIVE = 'active';
    case COMPLETED = 'completed';
    case CANCELLED = 'cancelled';

    /**
     * Get the translated label for the status
     */
    public function label(): string
    {
        return match($this) {
            self::DRAFT => 'Borrador',
            self::ACTIVE => 'Activa',
            self::COMPLETED => 'Completada',
            self::CANCELLED => 'Cancelada',
        };
    }

    /**
     * Get the color for the status
     */
    public function color(): string
    {
        return match($this) {
            self::DRAFT => 'secondary',
            self::ACTIVE => 'primary',
            self::COMPLETED => 'success',
            self::CANCELLED => 'danger',
        };
    }
}
