import React, { useState, useEffect } from 'react';

// Definimos la interfaz para mantener el estándar de TypeScript de DroneDT
interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
}

