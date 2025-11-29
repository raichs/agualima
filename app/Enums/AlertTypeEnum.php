<?php

namespace App\Enums;

enum AlertTypeEnum: string
{
    case HIGH_DEVIATION = 'high_deviation';
    case FREQUENCY_LIMIT = 'frequency_limit';
    case INSUFFICIENT_STAFF = 'insufficient_staff';
    case KG_TARGET_RISK = 'kg_target_risk';

    /**
     * Get the translated label for the alert type
     */
    public function label(): string
    {
        return match($this) {
            self::HIGH_DEVIATION => 'Desviación Alta',
            self::FREQUENCY_LIMIT => 'Frecuencia en Límite',
            self::INSUFFICIENT_STAFF => 'Personal Insuficiente',
            self::KG_TARGET_RISK => 'Meta en Riesgo',
        };
    }

    /**
     * Get the severity level
     */
    public function severity(): string
    {
        return match($this) {
            self::HIGH_DEVIATION => 'high',
            self::FREQUENCY_LIMIT => 'critical',
            self::INSUFFICIENT_STAFF => 'medium',
            self::KG_TARGET_RISK => 'high',
        };
    }

    /**
     * Get the color for the alert
     */
    public function color(): string
    {
        return match($this) {
            self::HIGH_DEVIATION => 'warning',
            self::FREQUENCY_LIMIT => 'danger',
            self::INSUFFICIENT_STAFF => 'info',
            self::KG_TARGET_RISK => 'warning',
        };
    }
}
