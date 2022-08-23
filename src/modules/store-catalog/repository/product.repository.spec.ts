import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.model";
import ProductRepository from "./product.repsitory";

describe("ProductRepository test", () => {
  let sequelize: Sequelize;
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });
  afterEach(async () => {
    await sequelize.close();
  });

  it("should find all products", async () => {
    await ProductModel.create({
      id: "1",
      name: "Product 1",
      description: "Description 1",
      salesPrice: 100,
    });
    await ProductModel.create({
      id: "2",
      name: "Product 2",
      description: "Description 2",
      salesPrice: 200,
    });
    const productRepository = new ProductRepository();
    const [product1, product2] = await productRepository.findAll();
    expect(product1.id.id).toBe("1");
    expect(product1.name).toBe("Product 1");
    expect(product1.description).toBe("Description 1");
    expect(product1.salesPrice).toBe(100);
    expect(product2.id.id).toBe("2");
    expect(product2.name).toBe("Product 2");
    expect(product2.description).toBe("Description 2");
    expect(product2.salesPrice).toBe(200);
  });

  it("should find a product", async () => {
    await ProductModel.create({
      id: "1",
      name: "Product 1",
      description: "Description 1",
      salesPrice: 100,
    });
    const productRepository = new ProductRepository();
    const product = await productRepository.find("1");
    expect(product.id.id).toBe("1");
    expect(product.name).toBe("Product 1");
    expect(product.description).toBe("Description 1");
    expect(product.salesPrice).toBe(100);
  });
});
