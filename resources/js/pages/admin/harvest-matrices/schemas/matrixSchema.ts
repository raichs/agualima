import * as yup from 'yup';

export const rowSchema = yup.object({
    id: yup.number().optional(),
    variety_id: yup.string().required('Variedad requerida'),
    shift_id: yup.string().required('Turno requerido'),
    lots: yup.array().of(
        yup.object({
            lot_id: yup.string().required('Lote requerido'),
            lines: yup.number().required('Líneas requeridas').min(1),
            total_kilos: yup.number().required('Kilos requeridos').min(0),
            kg_per_shift_avg: yup.number().required('Kg/Jor Prom requerido').min(0),
            total_shifts: yup.number().required('Jornales requeridos').min(0),
            daily_data: yup.array().of(
                yup.object({
                    day_of_week: yup.number().required(),
                    date: yup.string().required(),
                    frequency: yup.number().required().min(0),
                    kg_per_day: yup.number().required().min(0),
                    shifts: yup.number().required().min(0),
                })
            ),
        })
    ).min(1, 'Al menos un lote requerido'),
});

export const matrixSchema = yup.object({
    rows: yup.array().of(rowSchema).required().default([]),
});

export type MatrixFormData = yup.InferType<typeof matrixSchema>;
