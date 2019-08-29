let AfterHomeVisitTimePeriod = {
    unit: 'minutes',
    value: 5
}

const hostname = window && window.location && window.location.hostname

if (hostname === 'myaccount.stockport.gov.uk' || hostname === 'staging-dts.smbcdigital.net') {
    AfterHomeVisitTimePeriod = {
        unit: 'hours',
        value: 3
    }
}

export {
    AfterHomeVisitTimePeriod
}