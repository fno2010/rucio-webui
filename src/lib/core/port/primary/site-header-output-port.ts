import { SiteHeaderError, SiteHeaderResponse } from "../../usecase-models/site-header-usecase-models";

/**
 * The interface defines a presenter that will generate a ViewModel used by the Site Header component.
 */
export default interface SiteHeaderOutputPort<T> {
    response: T;
    presentSuccess(responseModel: SiteHeaderResponse): Promise<void>;
    presentError(errorModel: SiteHeaderError): Promise<void>;
}