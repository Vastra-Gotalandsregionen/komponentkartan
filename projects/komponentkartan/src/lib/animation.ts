import {
    trigger,
    animate,
    transition,
    style,
    state,
    query,
    stagger
} from '@angular/animations';

export const toggleExpandedState = trigger('toggleExpandedState', [
    state('false, void', style({
        height: '0', overflow: 'hidden'
    })),
    state('true', style({
        height: '*', overflow: 'hidden'
    })),
    transition('* => *', [animate('{{speed}}')],
        { params: { speed: '400ms ease' } }
    )
]);

export const toggleChevron = trigger('animateChevron', [
    state('false', style({
        transform: 'rotate(0deg)'
    })),
    state('true', style({
        transform: 'rotate(-180deg)'
    })),
    transition('* => *', [animate('400ms ease')]),
]);

export const toggleFadedState = trigger('toggleFadedState', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease', style({ opacity: 1 })),
    ]),
    transition(':leave', [
        style({ opacity: 1, height: '*' }),
        animate('400ms ease', style({ opacity: 0, height: 0 })),
    ]),
]);

export const remove = trigger('remove', [
    // state('start', style({
    //     height: '*'
    // })),
    // state('end', style({
    //     height: '0', opacity: '0', overflow: 'hidden'
    // })),
    // transition('start => end', animate('1.4s'))
    transition(':enter', [
        style({ height: '0', opacity: '1', overflow: 'hidden', display: 'block' }),
        animate('{{speed}}', style({ height: '*', opacity: '1' })),
    ], { params: { speed: '.2s' } }),

    transition(':leave', [
        style({ height: '*', overflow: 'hidden', display: 'block' }),
        animate('{{speed}}', style({ height: '0', opacity: '0' })),
    ], { params: { speed: '.2s' } }),
]);

export const deleteListRow = trigger('deleted', [
    transition(':leave', [
        style({ opacity: 1, height: '*', overflow: 'hidden' }),
        animate('0.4s ease', style({ opacity: 0, height: 0, overflow: 'hidden' })),
    ]),
]);

export const listStagger = trigger('listStagger', [
    transition('* <=> *', [
        query(
            ':enter',
            [
                style({ opacity: 0, transform: 'translateY(-15px)' }),
                stagger(
                    '50ms',
                    animate(
                        '550ms ease-out',
                        style({ opacity: 1, transform: 'translateY(0px)' })
                    )
                )
            ],
            { optional: true }
        ),
        query(':leave', animate('50ms', style({ opacity: 0 })), {
            optional: true
        })
    ])
]);