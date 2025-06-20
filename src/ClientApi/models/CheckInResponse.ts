/* tslint:disable */
/* eslint-disable */
/**
 * WaitingList.Api
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { ValidationMessage } from './ValidationMessage';
import {
    ValidationMessageFromJSON,
    ValidationMessageFromJSONTyped,
    ValidationMessageToJSON,
    ValidationMessageToJSONTyped,
} from './ValidationMessage';
import type { PartyDto } from './PartyDto';
import {
    PartyDtoFromJSON,
    PartyDtoFromJSONTyped,
    PartyDtoToJSON,
    PartyDtoToJSONTyped,
} from './PartyDto';

/**
 * 
 * @export
 * @interface CheckInResponse
 */
export interface CheckInResponse {
    /**
     * 
     * @type {Array<ValidationMessage>}
     * @memberof CheckInResponse
     */
    messages: Array<ValidationMessage>;
    /**
     * 
     * @type {PartyDto}
     * @memberof CheckInResponse
     */
    party?: PartyDto;
}

/**
 * Check if a given object implements the CheckInResponse interface.
 */
export function instanceOfCheckInResponse(value: object): value is CheckInResponse {
    if (!('messages' in value) || value['messages'] === undefined) return false;
    return true;
}

export function CheckInResponseFromJSON(json: any): CheckInResponse {
    return CheckInResponseFromJSONTyped(json, false);
}

export function CheckInResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): CheckInResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'messages': ((json['messages'] as Array<any>).map(ValidationMessageFromJSON)),
        'party': json['party'] == null ? undefined : PartyDtoFromJSON(json['party']),
    };
}

export function CheckInResponseToJSON(json: any): CheckInResponse {
    return CheckInResponseToJSONTyped(json, false);
}

export function CheckInResponseToJSONTyped(value?: CheckInResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'messages': ((value['messages'] as Array<any>).map(ValidationMessageToJSON)),
        'party': PartyDtoToJSON(value['party']),
    };
}

