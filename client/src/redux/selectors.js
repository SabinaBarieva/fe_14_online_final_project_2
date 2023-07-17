export const currentProduct = (state) => state.product.product;
export const errorInProduct = (state) => state.product.error;
export const currentProductIsLoading = (state) => state.product.isLoading;
export const currentProductGallery = (state) => state.product.gallery;
export const selectCart = (state) => state.basket;
export const modaInProductSlice = (state) => state.modalInProduct;
export const allProductsInBase = (state) => state.allProducts.allProds;
export const totalNumberProducts = (state) => state.products.total;
export const productsList = (state) => state.products.products;
export const categoriesFilter = (state) => state.filters.categories;
export const minimalPrice = (state) => state.filters.minPrice;
export const maximalPrice = (state) => state.filters.maxPrice;
export const isFetchingProductsList = (state) => state.products.isFetching;
export const isBurgerOpen = (state) => state.burgerMenu.openBurger;

