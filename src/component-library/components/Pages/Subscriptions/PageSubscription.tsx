import { twMerge } from "tailwind-merge";
import { H3 } from "../../Text/Headings/H3";
import { Tabs } from "../../Tabs/Tabs";
import { SubPage } from "../../Helpers/SubPage";
import { useState } from "react";
import { Titleth, Contenttd, Generaltable } from "../../Helpers/Metatable";
import { SubscriptionMeta } from "@/lib/core/entity/rucio";
import { DateTag } from "../../Tags/DateTag";
import { BoolTag } from "../../Tags/BoolTag";
import { SubscriptionStateTag } from "../../Tags/SubscriptionStateTag";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { Collapsible } from "../../Helpers/Collapsible";
import { Accordion } from "../../Helpers/Accordion";
import { Code } from "../../Text/Content/Code";
import { AreaInput } from "../../Input/AreaInput";
import { Button } from "../../Button/Button";
import { PageSubscriptionJSONEditor } from "./PageSubscriptionJSONEditor";
import { Type } from "@sinclair/typebox";
import { SubscriptionFilter, SubscriptionReplicationRules } from "@/lib/core/entity/subscription";
import { Heading } from "../Helpers/Heading";
import { Body } from "../Helpers/Body";

export interface PageSubscriptionPageProps {
    subscriptionMeta: SubscriptionMeta
    editFilter: (filter: string) => void
    editReplicationRules: (rules: string) => void
}

export const PageSubscription = (
    props: PageSubscriptionPageProps
) => {
    const [subpageIndex, setSubpageIndex] = useState<number>(0);
    const meta = props.subscriptionMeta
    return (
        <div
            className={twMerge("flex flex-col space-y-2 w-full")}
        >
            <Heading
                title="View Subscription"
                subtitle={`For subscription ${props.subscriptionMeta.name}`}
            />
            <Body>
                <Tabs
                    tabs={["Metadata", "Edit Subscription"]}
                    _ariaControls={["metadata", "edit-subscription"]}
                    active={0}
                    updateActive={active => { setSubpageIndex(active) }}
                />
                <SubPage
                    show={subpageIndex === 0}
                    id="subpage-metadata"
                    aria-labelledby="tab-0"
                    role="tabpanel"
                >
                    <div
                        className={twMerge(
                            "flex flex-col space-y-2",
                            "md:grid md:grid-cols-2 md:gap-2",
                            "w-full",
                        )}
                    >
                        <div>
                            <Accordion name="Filter" className="p-1">
                                <Code>
                                    {meta.filter}
                                </Code>
                            </Accordion>
                            <Accordion name="Replication Rules" className="p-1">
                                <Code>
                                    {meta.replication_rules}
                                </Code>
                            </Accordion>
                        </div>
                        <div
                            className={twMerge(
                                "bg-stone-100 dark:bg-gray-900 p-2 mt-2 rounded-md",
                                "flex flex-col space-y-2"
                            )}
                        >
                            <Generaltable>
                                <tr>
                                    <Titleth>Name</Titleth>
                                    <Contenttd>{meta.name}</Contenttd>
                                </tr>
                                <tr>
                                    <Titleth>Account</Titleth>
                                    <Contenttd>{meta.account}</Contenttd>
                                </tr>
                                <tr>
                                    <Titleth>Comments</Titleth>
                                    <Contenttd>{meta.comments}</Contenttd>
                                </tr>
                                <tr>
                                    <Titleth>ID</Titleth>
                                    <Contenttd>{meta.id}</Contenttd>
                                </tr>
                            </Generaltable>
                            <Generaltable>
                                <tr>
                                    <Titleth>Created At</Titleth>
                                    <Contenttd><DateTag date={new Date(meta.created_at)} /></Contenttd>
                                </tr>
                                <tr>
                                    <Titleth>Last Processed</Titleth>
                                    <Contenttd><DateTag date={new Date(meta.last_processed)} /></Contenttd>
                                </tr>
                                <tr>
                                    <Titleth>Updated At</Titleth>
                                    <Contenttd><DateTag date={new Date(meta.updated_at)} /></Contenttd>
                                </tr>
                                <tr>
                                    <Titleth>Lifetime</Titleth>
                                    <Contenttd><DateTag date={new Date(meta.lifetime)} /></Contenttd>
                                </tr>
                            </Generaltable>
                            <Generaltable>
                                <tr>
                                    <Titleth>State</Titleth>
                                    <Contenttd><SubscriptionStateTag state={meta.state} /></Contenttd>
                                </tr>
                                <tr>
                                    <Titleth>Retroactive</Titleth>
                                    <Contenttd><BoolTag val={meta.retroactive} /></Contenttd>
                                </tr>
                                <tr>
                                    <Titleth>Policy ID</Titleth>
                                    <Contenttd>{meta.policyid}</Contenttd>
                                </tr>
                            </Generaltable>
                        </div>
                    </div>
                </SubPage>
                <SubPage
                    show={subpageIndex === 1}
                    id="subpage-edit-subscription"
                    aria-labelledby="tab-1"
                    role="tabpanel"
                >
                    <div className="flex flex-col space-y-2">
                        <Accordion name="Filter" className="p-1">
                            <PageSubscriptionJSONEditor
                                defaultString={meta.filter}
                                submit={props.editFilter}
                                schema={SubscriptionFilter}
                            />
                        </Accordion>
                        <Accordion name="Replication Rules" className="p-1">
                            <PageSubscriptionJSONEditor
                                defaultString={meta.replication_rules}
                                submit={props.editReplicationRules}
                                schema={SubscriptionReplicationRules}
                            />
                        </Accordion>
                    </div>
                </SubPage>
            </Body>
        </div>
    );
};
