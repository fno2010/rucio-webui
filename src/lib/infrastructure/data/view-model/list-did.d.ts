import { BaseViewModel } from "@/lib/common/base-components/view-models";
import { ListDIDsResponse } from "@/lib/core/use-case/list-dids/list-dids-usecase-models";
import { DID } from "@/lib/core/entity/rucio";

export interface ListDIDsViewModel extends DID, BaseViewModel {
    bytes: number;
    length: number;
}