import axios from "axios";
import assert from "assert";
import { serverApi } from "../../lib/config";
import { Company } from "../../types/user";
import { Definer } from "../../lib/definer";

export default class CompanyApiService {
    private readonly path: string;
    constructor() {
        this.path = serverApi;
    }

    async getBestCompany(data: any): Promise<Company[]> {
        try {
            const url = `/companies?order=${data.order}&page=1&limit=${data.limit}`,
                result = await axios.get(this.path + url, { withCredentials: true });
            assert.ok(result, Definer.general_err1);

            const best_Company: Company[] = result.data.data;
            return best_Company;
        } catch (err: any) {
            console.log(`ERROR ::: getBestCompany ${err.message}`);

            throw err;
        }
    };

    async geCompanys(data: any): Promise<Company[]> {
        try {
            const url = `/companies?order=${data.order}&page=1&limit=${data.limit}`,
                result = await axios.get(this.path + url, { withCredentials: true });
            assert.ok(result, Definer.general_err1);

            const companies: Company[] = result.data.data;
            return companies;
        } catch (err: any) {
            console.log(`ERROR ::: getCompanys ${err.message}`);

            throw err;
        }
    }
}