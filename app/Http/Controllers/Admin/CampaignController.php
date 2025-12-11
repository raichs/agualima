<?php

namespace App\Http\Controllers\Admin;

use App\Http\Resources\CampaignCollection;
use App\Http\Resources\CampaignResource;
use App\Models\Campaign;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CampaignController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('admin/campaigns/index', [
            'filters' => $request->only('search'),
            'total' => Campaign::count(),
            'campaigns' => new CampaignCollection(
                Campaign::orderBy('id')
                    ->filter($request->only('search'))
                    ->paginate()
                    ->appends($request->all())
            ),
            'statusOptions' => Campaign::getStatuses(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('admin/campaigns/create', [
            'statusOptions' => Campaign::getStatusOptions(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after:start_date',
            'actual_end_date' => 'nullable|date',
            'pruning_period_start' => 'nullable|date',
            'pruning_period_end' => 'nullable|date',
            'status' => 'required|integer|min:1|max:5',
            'target_total_kg' => 'nullable|numeric|min:0',
            'actual_total_kg' => 'nullable|numeric|min:0',
            'climate_notes' => 'nullable|string',
            'agronomic_notes' => 'nullable|string',
            'closing_notes' => 'nullable|string',
        ]);

        Campaign::create($validated);

        return redirect()->route('admin.campaigns.index')
            ->with('success', 'Campaña creada exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Campaign $campaign): Response
    {
        return Inertia::render('admin/campaigns/show', [
            'campaign' => new CampaignResource($campaign),
            'statusOptions' => Campaign::getStatuses(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Campaign $campaign): Response
    {
        return Inertia::render('admin/campaigns/edit', [
            'campaign' => new CampaignResource($campaign),
            'statusOptions' => Campaign::getStatusOptions(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Campaign $campaign)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after:start_date',
            'actual_end_date' => 'nullable|date',
            'pruning_period_start' => 'nullable|date',
            'pruning_period_end' => 'nullable|date',
            'status' => 'required|integer|min:1|max:5',
            'target_total_kg' => 'nullable|numeric|min:0',
            'actual_total_kg' => 'nullable|numeric|min:0',
            'climate_notes' => 'nullable|string',
            'agronomic_notes' => 'nullable|string',
            'closing_notes' => 'nullable|string',
        ]);

        $campaign->update($validated);

        return redirect()->route('admin.campaigns.index')
            ->with('success', 'Campaña actualizada exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Campaign $campaign)
    {
        $campaign->delete();

        return redirect()->route('admin.campaigns.index')
            ->with('success', 'Campaña eliminada exitosamente.');
    }
}
