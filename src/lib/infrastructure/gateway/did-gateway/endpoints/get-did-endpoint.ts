import { BaseEndpoint } from "@/lib/sdk/gateway-endpoints"
import { BaseHttpErrorTypes } from "@/lib/sdk/http"
import { HTTPRequest } from "@/lib/common/http";
import { DIDDTO } from "@/lib/core/dto/did-dto";
import { DIDType } from "@/lib/core/entity/rucio";
import { Response } from "node-fetch";

export default class GetDIDEndpoint extends BaseEndpoint<DIDDTO> {

    constructor(
        private rucioAuthToken: string,
        private scope: string,
        private name: string,
    ) {
        super()
    }
    /**
     * @override
     */
    async initialize(): Promise<void> {
        await super.initialize()
        this.url = `${this.rucioHost}/dids/${this.scope}/${this.name}/status`
        const request: HTTPRequest = {
            method: 'GET',
            url: this.url,
            headers: {
                'X-Rucio-Auth-Token': this.rucioAuthToken,
                'Content-Type': 'application/json',
            },
            body: null,
            params: undefined
        }
        this.request = request
        this.initialized = true
    }
    /**
     * @implements
     */
    async reportErrors(statusCode: number, response: Response): Promise<DIDDTO | undefined> {
        const dto: DIDDTO = {
            status: 'error',
            error: BaseHttpErrorTypes.UNKNOWN_ERROR,
            name: this.name,
            scope: this.scope,
            did_type: DIDType.UNKNOWN,
            account: '',
            open: false,
            monotonic: false,
            expired_at: '',
            bytes: 0,
            length: 0,
        }
        let error = {
            errorMessage: '',
            errorCode: statusCode
        }
        dto.error = error
        switch (statusCode) {
            case 400:
                dto.error.errorMessage = 'Invalid Parameters'
                break;
            case 404:
                const error = await response.json()
                if (error.exception === 'DataIdentifierNotFound') {
                    dto.error.errorMessage = 'Data Identifier Not Found'
                }
                if (error.exception === 'ScopeNotFound') {
                    dto.error.errorMessage = 'Scope Not Found'
                }
                break
            default:
                dto.error.errorMessage = 'Unknown Error'
                break
        }
        return dto
    }

    /**
     * @implements
     */
    createDTO(data: any): DIDDTO {
        data = data as {
            type: string,
            account: string,
            open: boolean,
            monotonic: boolean,
            expired_at: string,
            bytes: number,
            length: number,
        }

        const type = data.type
        let did_type: DIDType = DIDType.UNKNOWN
        if (type === 'DATASET') {
            did_type = DIDType.DATASET
        } else if (type === 'CONTAINER') {
            did_type = DIDType.CONTAINER
        } else if (type === 'FILE') {
            did_type = DIDType.FILE
        }

        const dto: DIDDTO = {
            status: 'success',
            error: null,
            name: this.name,
            scope: this.scope,
            did_type: did_type,
            account: data.account,
            open: data.open,
            monotonic: data.monotonic,
            expired_at: data.expired_at,
            bytes: data.bytes,
            length: data.length,
        }
        return dto
    }

}