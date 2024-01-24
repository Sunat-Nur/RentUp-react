import {serverApi} from "../../lib/config";
import axios from "axios";
import assert from "assert";
import {Definer} from "../../lib/definer";
import {ProductSearchObj} from "../../types/others";
import {Product} from "../../types/product";


class ProductApiService {
    private readonly path: string;

    constructor() {
        this.path = serverApi;
    }


    async getAllProducts(data: ProductSearchObj): Promise<Product[]> {
        try {
            console.log("data", data);

            const url = "/products",
                result = await axios.post(this.path + url, data, {
                    withCredentials: true,
                });
            assert.ok(result, Definer.general_err1);

            console.log("state", result);
            const products: Product[] = result.data.data;
            return products;
        } catch (err: any) {
            console.log(`ERROR ::: getAllProducts ${err.message}`);

            throw err;
        }
    }

    async getTargetProducts(data: ProductSearchObj): Promise <Product[]> {
        try {
            const url = '/products',
                result = await axios.post(this.path + url, data, {
                    withCredentials: true,
                });
            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data.state !== "fail", Definer.general_err1);
            console.log("state:::", result.data.state);


            const products: Product[] = result.data.data;
            return products;  // qiymatni return qilayopman.
        } catch (err: any) {
            console.log(`ERROR ::: getTargetProducts ${err.message}`);
            throw err;
        }
    };


    async getChosenDish(dish_id: string): Promise<Product> {
        try {
            const url = `/products/${dish_id}`,
                result = await axios.get(this.path + url, {
                    withCredentials: true,
                });
            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data.state !== "fail", Definer.general_err1);
            console.log("state:::", result.data.state);

            const product: Product = result.data.data;
            return product;  // qiymatni return qilayopman.
        } catch (err: any) {
            console.log(`ERROR ::: getChosenDish ${err.message}`);
            throw err;
        }
    };

}

export default ProductApiService;