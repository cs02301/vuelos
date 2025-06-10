export const destinations = [
  {
    code: 'JFK',
    city: 'New York',
    country: 'United States',
    price: 299,
    image: 'https://images.pexels.com/photos/802024/pexels-photo-802024.jpeg'
  },
  {
    code: 'LAX',
    city: 'Los Angeles',
    country: 'United States',
    price: 349,
    image: 'https://images.pexels.com/photos/1444921/pexels-photo-1444921.jpeg'
  },
  {
    code: 'LHR',
    city: 'London',
    country: 'United Kingdom',
    price: 449,
    image: 'https://images.pexels.com/photos/77171/pexels-photo-77171.jpeg'
  },
  {
    code: 'CDG',
    city: 'Paris',
    country: 'France',
    price: 429,
    image: 'https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg'
  },
  {
    code: 'SYD',
    city: 'Sydney',
    country: 'Australia',
    price: 899,
    image: 'https://images.pexels.com/photos/995764/pexels-photo-995764.jpeg'
  },
  {
    code: 'DXB',
    city: 'Dubai',
    country: 'United Arab Emirates',
    price: 599,
    image: 'https://images.pexels.com/photos/1743367/pexels-photo-1743367.jpeg'
  },
  {
    code: 'HND',
    city: 'Tokyo',
    country: 'Japan',
    price: 749,
    image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg'
  },
  {
    code: 'SIN',
    city: 'Singapore',
    country: 'Singapore',
    price: 649,
    image: 'https://images.pexels.com/photos/3987158/pexels-photo-3987158.jpeg'
  }
];

export const flights = [
  {
    id: '1',
    flightNumber: '101',
    origin: 'JFK',
    destination: 'LAX',
    departureDate: '2025-06-15',
    departureTime: '08:30',
    arrivalDate: '2025-06-15',
    arrivalTime: '11:45',
    duration: '5h 15m',
    price: 299,
    class: 'Economy',
    status: 'On Time'
  },
  {
    id: '2',
    flightNumber: '202',
    origin: 'LAX',
    destination: 'JFK',
    departureDate: '2025-06-20',
    departureTime: '10:15',
    arrivalDate: '2025-06-20',
    arrivalTime: '18:30',
    duration: '5h 15m',
    price: 329,
    class: 'Economy',
    status: 'On Time'
  },
  {
    id: '3',
    flightNumber: '303',
    origin: 'JFK',
    destination: 'LHR',
    departureDate: '2025-06-18',
    departureTime: '21:00',
    arrivalDate: '2025-06-19',
    arrivalTime: '09:45',
    duration: '6h 45m',
    price: 549,
    class: 'Economy',
    status: 'On Time'
  },
  {
    id: '4',
    flightNumber: '404',
    origin: 'LHR',
    destination: 'CDG',
    departureDate: '2025-06-22',
    departureTime: '14:30',
    arrivalDate: '2025-06-22',
    arrivalTime: '16:45',
    duration: '1h 15m',
    price: 199,
    class: 'Economy',
    status: 'On Time'
  },
  {
    id: '5',
    flightNumber: '505',
    origin: 'CDG',
    destination: 'DXB',
    departureDate: '2025-06-25',
    departureTime: '09:20',
    arrivalDate: '2025-06-25',
    arrivalTime: '18:30',
    duration: '6h 10m',
    price: 459,
    class: 'Economy',
    status: 'On Time'
  }
];

export const userBookings = [
  {
    id: '1',
    reference: 'AB123456',
    flightNumber: '101',
    origin: 'JFK',
    destination: 'LAX',
    departureDate: '2025-06-15',
    departureTime: '08:30',
    arrivalDate: '2025-06-15',
    arrivalTime: '11:45',
    class: 'Economy',
    status: 'Confirmed',
    bookingDate: '2025-03-10'
  },
  {
    id: '2',
    reference: 'AB654321',
    flightNumber: '202',
    origin: 'LAX',
    destination: 'JFK',
    departureDate: '2025-06-20',
    departureTime: '10:15',
    arrivalDate: '2025-06-20',
    arrivalTime: '18:30',
    class: 'Economy',
    status: 'Confirmed',
    bookingDate: '2025-03-10'
  },
  {
    id: '3',
    reference: 'AB789012',
    flightNumber: '505',
    origin: 'CDG',
    destination: 'DXB',
    departureDate: '2025-04-25',
    departureTime: '09:20',
    arrivalDate: '2025-04-25',
    arrivalTime: '18:30',
    class: 'Business',
    status: 'Completed',
    bookingDate: '2025-02-15'
  },
  {
    id: '4',
    reference: 'AB345678',
    flightNumber: '606',
    origin: 'SYD',
    destination: 'SIN',
    departureDate: '2025-08-05',
    departureTime: '23:15',
    arrivalDate: '2025-08-06',
    arrivalTime: '04:30',
    class: 'Premium Economy',
    status: 'Pending',
    bookingDate: '2025-03-20'
  }
];

export const promotions = [
  {
    id: '1',
    title: 'Early Bird Special',
    description: 'Book 60 days in advance and save up to 30% on your flight.',
    category: 'discount',
    discount: 30,
    validUntil: '2025-08-31',
    featured: true,
    image: 'https://images.pexels.com/photos/1098460/pexels-photo-1098460.jpeg'
  },
  {
    id: '2',
    title: 'Family Package',
    description: 'Children under 12 fly for 50% off when traveling with family.',
    category: 'family',
    discount: 50,
    validUntil: '2025-12-31',
    featured: true,
    maxPersons: 4,
    image: 'https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg'
  },
  {
    id: '3',
    title: 'Weekend Getaway',
    description: 'Fly on weekends and get 20% off on your return ticket.',
    category: 'discount',
    discount: 20,
    validUntil: '2025-09-30',
    featured: true,
    minimumStay: 2,
    image: 'https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg'
  },
  {
    id: '4',
    title: 'Business Class Upgrade',
    description: 'Pay for Economy, get upgraded to Business Class when available.',
    category: 'discount',
    validUntil: '2025-07-15',
    featured: true,
    image: 'https://images.pexels.com/photos/5388639/pexels-photo-5388639.jpeg'
  },
  {
    id: '5',
    title: 'Summer in Europe',
    description: 'Special fares to European destinations this summer.',
    category: 'destination',
    validUntil: '2025-08-31',
    featured: false,
    destinations: ['LHR', 'CDG'],
    priceFrom: 499
  },
  {
    id: '6',
    title: 'Winter Escape',
    description: 'Escape the cold with our special fares to warm destinations.',
    category: 'seasonal',
    validUntil: '2025-02-28',
    featured: false,
    destinations: ['DXB', 'SYD'],
    priceFrom: 699
  },
  {
    id: '7',
    title: 'City Break',
    description: 'Explore new cities with our weekend package deals.',
    category: 'destination',
    validUntil: '2025-10-31',
    featured: false,
    minimumStay: 2,
    priceFrom: 249
  },
  {
    id: '8',
    title: 'Senior Discount',
    description: 'Travelers over 65 receive a 15% discount on all flights.',
    category: 'discount',
    discount: 15,
    validUntil: '2025-12-31',
    featured: false
  },
  {
    id: '9',
    title: 'Honeymoon Special',
    description: 'Newly married couples receive a complimentary upgrade when available.',
    category: 'family',
    validUntil: '2025-12-31',
    featured: false,
    priceFrom: 799
  }
];