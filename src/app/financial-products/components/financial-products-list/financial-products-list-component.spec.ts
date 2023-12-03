import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FinancialProductsService } from '../../services/financial-products.service';
import { FinancialProductsListComponent } from "./financial-products-list.component";

describe('Financial products list component', () => {

    let component: FinancialProductsListComponent;
    let fixture: ComponentFixture<FinancialProductsListComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                FormsModule
            ],
            declarations: [
                FinancialProductsListComponent
            ],
            providers: [
                FinancialProductsService,
                DatePipe
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FinancialProductsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});