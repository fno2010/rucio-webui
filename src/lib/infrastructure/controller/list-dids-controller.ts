import { BaseController, TAuthenticatedControllerParameters } from "@/lib/common/base-components/controller";
import { ListDIDsRequest } from "@/lib/core/data/usecase-models/list-dids-usecase-models";
import { DIDType } from "@/lib/core/entity/rucio";
import ListDIDsInputPort from "@/lib/core/port/primary/list-dids-input-port";
import { injectable, inject } from "inversify";
import { NextApiResponse } from "next";
import USECASE_FACTORY from "../config/ioc/ioc-symbols-usecase-factory";

export type ListDIDsControllerParameters = TAuthenticatedControllerParameters & {
    query: string,
    type: string
};
@injectable()
class ListDIDsController extends BaseController<ListDIDsControllerParameters, ListDIDsRequest> {
    constructor(
        @inject(USECASE_FACTORY.LIST_DIDS) listDIDsUseCaseFactory: (response: NextApiResponse) => ListDIDsInputPort,
    ) {
        super(listDIDsUseCaseFactory);
    }
    prepareRequestModel(parameters: ListDIDsControllerParameters): ListDIDsRequest {
        const type = parameters.type.toLowerCase();
        let did_type = DIDType.ALL;
        switch(type) {
            case 'container': {
                did_type = DIDType.CONTAINER;
            }
            case 'dataset': {
                did_type = DIDType.DATASET;
                break;
            }
            case 'file': {
                did_type = DIDType.FILE;
                break;
            }
            default: {
                did_type = DIDType.ALL;
            }
        }
        return {
            query: parameters.query,
            type: did_type,
            rucioAuthToken: parameters.rucioAuthToken
        }
    }
}

export default ListDIDsController;