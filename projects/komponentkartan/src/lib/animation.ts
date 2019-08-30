import {
    trigger,
    animate,
    transition,
    style,
    state
} from '@angular/animations';

export const toggleExpandedState = trigger('toggleExpandedState', [
    transition(':enter', [
        style({ height: '0' }),
        animate('{{speed}}', style({ height: '*' }))
    ], { params: { speed: '0.4s'} }),
    transition(':leave', [
        style({ height: '*' }),
        animate('{{speed}}', style({ height: '0', overflow: 'hidden' })),
    ], { params: { speed: '0.4s'} }),
]);