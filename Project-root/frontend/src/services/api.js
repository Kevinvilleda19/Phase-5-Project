import products from '../data/data'; // Adjust the path based on your structure


// Simulate fetching all products
export const fetchProducts = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products); // Simulate a network request with a delay
    }, 1000);
  });
};

// Simulate fetching a single product by ID
export const fetchProductById = async (id) => {
  const product = products.find((product) => product.id === Number(id));
  if (!product) {
    throw new Error('Product not found');
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(product);
    }, 1000);
  });
};
const arProducts = [
  {
      id: 21,
      name: "3D Dresser",
      description: "A beautiful 3D model dresser that fits perfectly in any room.",
      price: 199.99,
      image: "https://drive.google.com/uc?export=view&id=1OwjKJxJxSIbmCzRn2E_4j6SGe-XIl6Yw", 
      modelUrl: "path_to_your_model/trim_sheet__example_dresser.glb" 
  },
];
// Add this new function
export const fetchARProducts = async () => {
  return new Promise((resolve) => {
      setTimeout(() => {
          resolve(arProducts);
      }, 1000);
  });
};