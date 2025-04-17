import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.page.html',
  styleUrls: ['./marketplace.page.scss'],
})
export class MarketplacePage implements OnInit {
  productos = [
    { nombre: 'Producto 1', precio: 100, imagen: 'assets/producto1.jpg' },
    { nombre: 'Producto 2', precio: 150, imagen: 'assets/producto2.jpg' },
    // Agrega más productos según sea necesario
  ];

  constructor() {}

  ngOnInit() {}
}
