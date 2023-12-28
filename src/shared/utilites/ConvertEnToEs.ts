export function convertEnToEs(value: string): string {
    switch (value) {
        case 'started':
            return 'Empezado';
        
        case 'pending_approval':
            return 'Pendiente';
        
        case 'rejected':
            return 'Rechazado';

        case 'approved':
            return 'Aprobado';

        case 'suspended':
            return 'Suspendido';
    }
}