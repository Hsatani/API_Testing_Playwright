import {APIRequestContext} from "@playwright/test"
import {expect} from "@playwright/test"
import {test} from "@playwright/test"


export class RequestHandler{

    private request: APIRequestContext;
    private baseUrl: string  | undefined;
    private defaultBaseUrl: string;
    private apiPath: string = '';
    private queryParams: object = {};
    private apiHeaders: Record<string, string> = {};
    private apiBody: object = {};
    private clearAuthFlag: boolean | undefined

    constructor(request: APIRequestContext, apiBaseUrl: string){
        this.request = request;
        this.defaultBaseUrl = apiBaseUrl;        
    }

    url(url: string){
        this.baseUrl = url;
        return this;
    }

    path(path: string){
        this.apiPath = path;
        return this;
    }

    params(params: object){
        this.queryParams = params;
        return this;
    }

    headers(headers: Record<string, string>){
        this.apiHeaders = headers;
        return this;
    }

    body(body: object){
        this.apiBody = body;
        return this;
    }

    clearAuth() {
        this.clearAuthFlag = true
        return this
    }

    private getUrl(){
        const url = new URL(`${this.baseUrl ?? this.defaultBaseUrl}${this.apiPath}`);
        for(const [key, value] of Object.entries(this.queryParams)){
            url.searchParams.append(key, value)
        }
        return url.toString()
    }


    async getRequest(statusCode: number){
        let responseJSON: any

        const url = this.getUrl();
        await test.step(`Get request to: ${url}`, async() => {

            const response = await this.request.get(url, {
                headers: this.getHeades()
            })

            const  actualStatus = response.status();
            expect(actualStatus).toEqual(statusCode);
            responseJSON = await response.json();

        })

        return responseJSON;
    }


    async postRequest(statusCode: number){
        let responseJSON: any

        const url = this.getUrl();
        await test.step(`POST request to: ${url}`, async() => {
            const response = await this.request.post(url, {
                headers: this.apiHeaders,
                data:this.apiBody
            })
            
            const  actualStatus = response.status();           
            responseJSON = await response.json();
            
            expect(actualStatus).toEqual(statusCode);
        })

        return responseJSON;
    }

    
   private getHeades(): { [key: string]: string; } | undefined {
    //    if (!this.clearAuthFlag) {
    //         this.apiHeaders['Authorization'] = this.apiHeaders['Authorization'] || this.defaultAuthToken
    //     }
        return this.apiHeaders
    }

      private cleanupFields() {
        this.apiBody = {}
        this.apiHeaders = {}
        this.baseUrl = undefined
        this.apiPath = ''
        this.queryParams = {}
        this.clearAuthFlag = false
    }



}