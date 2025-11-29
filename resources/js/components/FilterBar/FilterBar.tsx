// import { useState, useEffect } from 'react';
// import { usePage, router } from '@inertiajs/react';
// import { Button, Col, FormControl, FormGroup, FormLabel, FormSelect, InputGroup, Row } from 'react-bootstrap';
// import IconifyIcon from '@/components/wrappers/IconifyIcon';
// import pickBy from 'lodash/pickBy';

// interface FilterBarProps {
//   showRole?: boolean;
//   showTrashed?: boolean;
//   searchPlaceholder?: string;
// }

// export default function FilterBar({
//   showRole = false,
//   showTrashed = false,
//   searchPlaceholder = 'Buscar...'
// }: FilterBarProps) {
//   const { filters } = usePage<{
//     filters?: { role?: string; search?: string; trashed?: string };
//   }>().props;

//   const [values, setValues] = useState({
//     role: filters?.role || '',
//     search: filters?.search || '',
//     trashed: filters?.trashed || ''
//   });

//   function reset() {
//     setValues({
//       role: '',
//       search: '',
//       trashed: ''
//     });
//   }

//   useEffect(() => {
//     const query = Object.keys(pickBy(values)).length ? pickBy(values) : {};

//     router.get(route(route().current() as string), query, {
//       replace: true,
//       preserveState: true,
//       only: ['filters']
//     });
//   }, [values]);

//   function handleChange(
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) {
//     const name = e.target.name;
//     const value = e.target.value;

//     setValues(values => ({
//       ...values,
//       [name]: value
//     }));
//   }

//   return (
//     <Row className="mb-3">
//       <Col md={6}>
//         <InputGroup>
//           <InputGroup.Text>
//             <IconifyIcon icon="tabler:search" />
//           </InputGroup.Text>
//           <FormControl
//             type="text"
//             name="search"
//             placeholder={searchPlaceholder}
//             value={values.search}
//             onChange={handleChange}
//           />
//         </InputGroup>
//       </Col>

//       {showRole && (
//         <Col md={3}>
//           <FormGroup>
//             <FormSelect name="role" value={values.role} onChange={handleChange}>
//               <option value="">Todos los roles</option>
//               <option value="user">Usuario</option>
//               <option value="owner">Propietario</option>
//             </FormSelect>
//           </FormGroup>
//         </Col>
//       )}

//       {showTrashed && (
//         <Col md={3}>
//           <FormGroup>
//             <FormSelect
//               name="trashed"
//               value={values.trashed}
//               onChange={handleChange}
//             >
//               <option value="">Sin eliminados</option>
//               <option value="with">Con eliminados</option>
//               <option value="only">Solo eliminados</option>
//             </FormSelect>
//           </FormGroup>
//         </Col>
//       )}

//       <Col md={showRole || showTrashed ? 12 : 6} className="d-flex align-items-center justify-content-end">
//         <Button
//           variant="light"
//           size="sm"
//           onClick={reset}
//           className="d-flex align-items-center"
//         >
//           <IconifyIcon icon="tabler:refresh" className="me-1" />
//           Limpiar filtros
//         </Button>
//       </Col>
//     </Row>
//   );
// }