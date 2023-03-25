import antwerp from "./antwerp.json";
import chicago from "./chicago.json";
import toronto from "./toronto.json";
import san_francisco from "./san_francisco.json";

export const mocks = {
  "51.219448,4.402464": antwerp,
  "43.653225,-79.383186": toronto,
  "41.878113,-87.629799": chicago,
  "37.7749295,-122.4194155": san_francisco,
};

export const MyMocks = {
  antwerp: "51.219448,4.402464",
  toronto: "43.653225,-79.383186",
  chicago: "41.878113,-87.629799",
  'san francisco': "37.7749295,-122.4194155",
};

export const mockImages = [
  "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
  "https://www.foodiesfeed.com/wp-content/uploads/2019/04/mae-mu-oranges-ice-600x750.jpg",
  "https://www.foodiesfeed.com/wp-content/uploads/2020/08/detail-of-pavlova-strawberry-piece-of-cake-600x800.jpg",
  "https://www.foodiesfeed.com/wp-content/uploads/2019/04/mae-mu-baking-600x750.jpg",
  "https://www.foodiesfeed.com/wp-content/uploads/2019/04/mae-mu-pancakes-600x750.jpg",
  "https://www.foodiesfeed.com/wp-content/uploads/2019/02/messy-pizza-on-a-black-table-600x400.jpg",
  "https://www.foodiesfeed.com/wp-content/uploads/2019/02/pizza-ready-for-baking-600x400.jpg",
  'https://media.gettyimages.com/id/694198404/photo/burgers-and-fries.jpg?s=612x612&w=0&k=20&c=ctGFhG1GKgnhYpiWQjQP1YDtCxchOfOS083mEEDms5s=',
  'https://media.gettyimages.com/id/1313326790/photo/healthy-veggie-burger-with-vegan-patty-fresh-tomatoes-lettuce-and-potatofries-served-on.jpg?s=1024x1024&w=gi&k=20&c=yrIVZ2r0V29nAf9dANHq-9T152v9zcrhKWxiz8bMkWo=',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQHtGvQ2lTxSNjAPCS5ZMVh-GfrCxoTrdaroARGVACzHOVkIzaLcQr9yZaiNfetiBVXGY&usqp=CAU',
  'https://images.pexels.com/photos/750073/pexels-photo-750073.jpeg?cs=srgb&dl=pexels-dana-tentis-750073.jpg&fm=jpg',
  'https://thumbs.dreamstime.com/b/fast-food-concept-greasy-fried-restaurant-take-out-as-onion-rings-burger-hot-dogs-fried-chicken-french-fries-31114163.jpg'
];

export const locations = {
  antwerp: {
    results: [
      {
        geometry: {
          location: {
            lng: 4.402464,
            lat: 51.219448,
          },
          viewport: {
            northeast: {
              lat: 51.2145994302915,
              lng: 4.418074130291502,
            },
            southwest: {
              lat: 51.2119014697085,
              lng: 4.415376169708497,
            },
          },
        },
      },
    ],
  },
  "san francisco": {
    results: [
      {
        geometry: {
          location: { lat: 37.7749295, lng: -122.4194155 },
          viewport: {
            northeast: { lat: 37.812, lng: -122.3482 },
            southwest: { lat: 37.70339999999999, lng: -122.527 },
          },
        },
      },
    ],
    status: "OK",
  },
  chicago: {
    results: [
      {
        geometry: {
          location: {
            lng: -87.629799,
            lat: 41.878113,
          },
          viewport: {
            northeast: {
              lat: 41.88758823029149,
              lng: -87.6194830697085,
            },
            southwest: {
              lat: 41.88489026970849,
              lng: -87.6221810302915,
            },
          },
        },
      },
    ],
  },
  toronto: {
    results: [
      {
        geometry: {
          location: {
            lng: -79.383186,
            lat: 43.653225,
          },
          viewport: {
            northeast: {
              lat: 43.64794098029149,
              lng: -79.37325551970848,
            },
            southwest: {
              lat: 43.6452430197085,
              lng: -79.37595348029149,
            },
          },
        },
      },
    ],
  },
};