import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component( {
    selector: 'app-display-item',
    templateUrl: './display-item.component.html',
    styleUrls: [
        './display-item.component.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
} )
export class DisplayItemComponent {
    @Input() label = '';
    @Input() content = '';
}
