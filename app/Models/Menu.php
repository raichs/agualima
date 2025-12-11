<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Menu extends Model
{
    protected $fillable = [
        'key',
        'label',
        'icon',
        'url',
        'is_title',
        'badge',
        'badge_icon',
        'permission',
        'parent_id',
        'target',
        'is_disabled',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_title' => 'boolean',
        'badge' => 'array',
        'is_disabled' => 'boolean',
        'is_active' => 'boolean',
    ];

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Menu::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(Menu::class, 'parent_id')->orderBy('order');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('order');
    }

    public function scopeRoot($query)
    {
        return $query->whereNull('parent_id');
    }
}
