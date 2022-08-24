import StoreCatalogFacade from "../facade/store-caralog.facade";
import ProductRepository from "../repository/product.repsitory";
import FindAllProductsUseCase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUseCase from "../usecase/find-product/find-product.usecase";

export default class StoreCatalogFacadeFactory {
  static create(): StoreCatalogFacade {
    const productRepository = new ProductRepository();
    const findUseCase = new FindProductUseCase(productRepository);
    const findAllUseCase = new FindAllProductsUseCase(productRepository);
    const facade = new StoreCatalogFacade({
      findUseCase,
      findAllUseCase,
    });
    return facade;
  }
}
