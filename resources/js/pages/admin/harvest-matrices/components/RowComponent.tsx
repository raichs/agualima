import React, { useMemo } from 'react';
import { Controller, useFieldArray, useWatch } from 'react-hook-form';
import { Button } from 'react-bootstrap';
import Select from 'react-select';
import { useRowCalculations } from '../hooks/useRowCalculations';

interface SelectOption {
    value: string;
    label: string;
}

interface RowComponentProps {
    rowIndex: number;
    control: any;
    varietyOptions: SelectOption[];
    shiftOptions: SelectOption[];
    lotOptions: SelectOption[];
    dayNames: string[];
    onRemove: () => void;
}

export const RowComponent: React.FC<RowComponentProps> = ({
    rowIndex,
    control,
    varietyOptions,
    shiftOptions,
    lotOptions,
    dayNames,
    onRemove
}) => {
    const { fields: lotFields, append: appendLot, remove: removeLot } = useFieldArray({
        control,
        name: `rows.${rowIndex}.lots`,
    });

    const currentRow = useWatch({
        control,
        name: `rows.${rowIndex}`,
    });

    const { kgPerTurno, calculateKilosForLot, calculateShiftsForLot } = useRowCalculations(currentRow);

    const addLot = () => {
        const defaultDates = currentRow?.lots?.[0]?.daily_data || [];

        appendLot({
            lot_id: '',
            lines: 1,
            total_kilos: 0,
            kg_per_shift_avg: 0,
            total_shifts: 0,
            daily_data: defaultDates.map((data: any) => ({
                day_of_week: data.day_of_week,
                date: data.date,
                frequency: 0,
                kg_per_day: 0,
                shifts: 0,
            }))
        });
    };

    const selectStyles = {
        menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
        control: (provided: any, state: any) => ({
            ...provided,
            fontSize: '0.875rem',
            borderColor: state.selectProps.error ? '#dc3545' : provided.borderColor,
            '&:hover': {
                borderColor: state.selectProps.error ? '#dc3545' : provided.borderColor
            }
        })
    };

    return (
        <tr>
            {/* Variedad Column */}
            <td className="harvest-matrix__sticky-col harvest-matrix__sticky-col--variety">
                <Controller
                    name={`rows.${rowIndex}.variety_id`}
                    control={control}
                    render={({ field: inputField, fieldState }) => (
                        <>
                            <Select
                                value={varietyOptions.find(opt => opt.value === inputField.value) || null}
                                onChange={(selected) => inputField.onChange(selected?.value || '')}
                                onBlur={inputField.onBlur}
                                className="select2"
                                options={varietyOptions}
                                isMulti={false}
                                placeholder="Seleccionar"
                                isClearable
                                menuPortalTarget={document.body}
                                styles={selectStyles}
                            />
                            {fieldState.error && (
                                <small className="text-danger harvest-matrix__select-error-text">
                                    {fieldState.error.message}
                                </small>
                            )}
                        </>
                    )}
                />
            </td>

            {/* Turno Column */}
            <td className="harvest-matrix__sticky-col harvest-matrix__sticky-col--shift">
                <Controller
                    name={`rows.${rowIndex}.shift_id`}
                    control={control}
                    render={({ field: inputField, fieldState }) => (
                        <>
                            <Select
                                value={shiftOptions.find(opt => opt.value === inputField.value) || null}
                                onChange={(selected) => inputField.onChange(selected?.value || '')}
                                onBlur={inputField.onBlur}
                                className="select2"
                                options={shiftOptions}
                                isMulti={false}
                                placeholder="Seleccionar"
                                isClearable
                                menuPortalTarget={document.body}
                                styles={selectStyles}
                            />
                            {fieldState.error && (
                                <small className="text-danger harvest-matrix__select-error-text">
                                    {fieldState.error.message}
                                </small>
                            )}
                        </>
                    )}
                />
            </td>

            {/* Lotes Column */}
            <td className="harvest-matrix__sticky-col harvest-matrix__sticky-col--lots">
                <div className="harvest-matrix__lot-container">
                    {lotFields.map((lotField, lotIndex) => (
                        <div key={lotField.id} className="d-flex align-items-center gap-1">
                            <Controller
                                name={`rows.${rowIndex}.lots.${lotIndex}.lot_id`}
                                control={control}
                                render={({ field: inputField, fieldState }) => (
                                    <div style={{ flex: 1 }}>
                                        <Select
                                            value={lotOptions.find(opt => opt.value === inputField.value) || null}
                                            onChange={(selected) => inputField.onChange(selected?.value || '')}
                                            onBlur={inputField.onBlur}
                                            className="select2"
                                            options={lotOptions}
                                            isMulti={false}
                                            placeholder="Lote"
                                            isClearable
                                            menuPortalTarget={document.body}
                                            styles={{
                                                ...selectStyles,
                                                control: (provided: any, state: any) => ({
                                                    ...provided,
                                                    minWidth: '120px',
                                                    fontSize: '0.875rem',
                                                    borderColor: state.selectProps.error ? '#dc3545' : provided.borderColor,
                                                })
                                            }}
                                        />
                                        {fieldState.error && (
                                            <small className="text-danger" style={{ fontSize: '0.65rem', display: 'block' }}>
                                                {fieldState.error.message}
                                            </small>
                                        )}
                                    </div>
                                )}
                            />
                            {lotFields.length > 1 && (
                                <Button
                                    onClick={() => removeLot(lotIndex)}
                                    variant="outline-danger"
                                    size="sm"
                                    className="px-1 py-0"
                                >
                                    ×
                                </Button>
                            )}
                        </div>
                    ))}
                    <Button onClick={addLot} variant="outline-success" size="sm" className="w-100">
                        +
                    </Button>
                </div>
            </td>

            {/* Líneas Column */}
            <td className="harvest-matrix__sticky-col harvest-matrix__sticky-col--lines">
                <div className="d-flex flex-column gap-1">
                    {lotFields.map((lotField, lotIndex) => (
                        <Controller
                            key={lotField.id}
                            name={`rows.${rowIndex}.lots.${lotIndex}.lines`}
                            control={control}
                            render={({ field: inputField }) => (
                                <input
                                    {...inputField}
                                    type="number"
                                    className="form-control form-control-sm harvest-matrix__input--sm"
                                    min="1"
                                    placeholder="Lín"
                                />
                            )}
                        />
                    ))}
                </div>
            </td>

            {/* Kilos Column (Readonly) */}
            <td className="harvest-matrix__sticky-col harvest-matrix__sticky-col--kilos">
                <div className="d-flex flex-column gap-1">
                    {lotFields.map((lotField, lotIndex) => (
                        <Controller
                            key={`${lotField.id}-kilos`}
                            name={`rows.${rowIndex}.lots.${lotIndex}.total_kilos`}
                            control={control}
                            render={({ field: inputField }) => {
                                const calculatedValue = (calculateKilosForLot[lotIndex] || 0).toFixed(2);
                                if (inputField.value !== parseFloat(calculatedValue)) {
                                    inputField.onChange(parseFloat(calculatedValue));
                                }
                                return (
                                    <input
                                        {...inputField}
                                        type="number"
                                        className="form-control form-control-sm harvest-matrix__input--md harvest-matrix__input--readonly"
                                        value={calculatedValue}
                                        readOnly
                                        disabled
                                    />
                                );
                            }}
                        />
                    ))}
                </div>
            </td>

            {/* Kg/Jor Prom Column */}
            <td className="harvest-matrix__sticky-col harvest-matrix__sticky-col--kg-avg">
                <div className="d-flex flex-column gap-1">
                    {lotFields.map((lotField, lotIndex) => (
                        <Controller
                            key={`${lotField.id}-kg-avg`}
                            name={`rows.${rowIndex}.lots.${lotIndex}.kg_per_shift_avg`}
                            control={control}
                            render={({ field: inputField }) => (
                                <input
                                    value={inputField.value || 0}
                                    onChange={(e) => inputField.onChange(parseFloat(e.target.value) || 0)}
                                    type="number"
                                    className="form-control form-control-sm harvest-matrix__input--md"
                                    min="0"
                                    step="0.1"
                                    placeholder="Kg/Jor"
                                />
                            )}
                        />
                    ))}
                </div>
            </td>

            {/* Jornales Column (Readonly) */}
            <td className="harvest-matrix__sticky-col harvest-matrix__sticky-col--shifts">
                <div className="d-flex flex-column gap-1">
                    {lotFields.map((lotField, lotIndex) => (
                        <Controller
                            key={`${lotField.id}-shifts`}
                            name={`rows.${rowIndex}.lots.${lotIndex}.total_shifts`}
                            control={control}
                            render={({ field: inputField }) => {
                                const calculatedValue = calculateShiftsForLot[lotIndex] || 0;
                                if (inputField.value !== calculatedValue) {
                                    inputField.onChange(calculatedValue);
                                }
                                return (
                                    <input
                                        {...inputField}
                                        type="number"
                                        className="form-control form-control-sm harvest-matrix__input--md harvest-matrix__input--readonly"
                                        value={calculatedValue}
                                        readOnly
                                        disabled
                                    />
                                );
                            }}
                        />
                    ))}
                </div>
            </td>

            {/* Kg x Turno Column */}
            <td className="harvest-matrix__sticky-col harvest-matrix__sticky-col--kg-turno" style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                <strong>{kgPerTurno.toFixed(2)}</strong>
            </td>

            {/* Daily Data Columns */}
            {dayNames.map((day, dayIndex) => (
                <React.Fragment key={day}>
                    <td>
                        <div className="d-flex flex-column gap-1">
                            {lotFields.map((lotField, lotIndex) => (
                                <Controller
                                    key={`${lotField.id}-freq-${dayIndex}`}
                                    name={`rows.${rowIndex}.lots.${lotIndex}.daily_data.${dayIndex}.frequency`}
                                    control={control}
                                    render={({ field: inputField }) => (
                                        <input
                                            value={inputField.value || 0}
                                            onChange={(e) => inputField.onChange(parseFloat(e.target.value) || 0)}
                                            type="number"
                                            className="form-control form-control-sm harvest-matrix__input--sm"
                                            placeholder="Freq"
                                            min="0"
                                            step="0.1"
                                        />
                                    )}
                                />
                            ))}
                        </div>
                    </td>
                    <td>
                        <div className="d-flex flex-column gap-1">
                            {lotFields.map((lotField, lotIndex) => (
                                <Controller
                                    key={`${lotField.id}-kg-${dayIndex}`}
                                    name={`rows.${rowIndex}.lots.${lotIndex}.daily_data.${dayIndex}.kg_per_day`}
                                    control={control}
                                    render={({ field: inputField }) => (
                                        <input
                                            value={inputField.value || 0}
                                            onChange={(e) => {
                                                const value = e.target.value === '' ? '' : parseFloat(e.target.value);
                                                inputField.onChange(value);
                                            }}
                                            type="number"
                                            className="form-control form-control-sm harvest-matrix__input--sm"
                                            placeholder="Kg/día"
                                            min="0"
                                            step="0.1"
                                        />
                                    )}
                                />
                            ))}
                        </div>
                    </td>
                    <td>
                        <div className="d-flex flex-column gap-1">
                            {lotFields.map((lotField, lotIndex) => (
                                <Controller
                                    key={`${lotField.id}-shifts-${dayIndex}`}
                                    name={`rows.${rowIndex}.lots.${lotIndex}.daily_data.${dayIndex}.shifts`}
                                    control={control}
                                    render={({ field: inputField }) => (
                                        <input
                                            value={inputField.value || 0}
                                            onChange={(e) => inputField.onChange(parseInt(e.target.value) || 0)}
                                            type="number"
                                            className="form-control form-control-sm harvest-matrix__input--sm"
                                            placeholder="Jornales"
                                            min="0"
                                            step="1"
                                        />
                                    )}
                                />
                            ))}
                        </div>
                    </td>
                </React.Fragment>
            ))}

            {/* Actions Column */}
            <td>
                <Button onClick={onRemove} variant="danger" size="sm">
                    Eliminar
                </Button>
            </td>
        </tr>
    );
};
