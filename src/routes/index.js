import { StageName } from 'helpers'
import Start from 'components/Pages/Start'
import { KnownByAnotherName, MoreAboutYou } from 'components/Pages/HomeVisit/1-TellUsAboutYou'
import { AreYouEmployed, EmploymentDetails } from 'components/Pages/HomeVisit/2-YourEmploymentDetails'
import LanguagesSpokenInYourHome from 'components/Pages/HomeVisit/3-LanguagesSpokenInYourHome'
import { AreYouMarried, MarriageDate, MovedInTogetherDate } from 'components/Pages/HomeVisit/4-PartnershipStatus'
import { HaveYouPreviouslyApplied } from 'components/Pages/HomeVisit/5-YourFosteringHistory'
import YourHealth from 'components/Pages/HomeVisit/6-YourHealth'
import { AboutYourInterest, TypesOfFostering } from 'components/Pages/HomeVisit/7-InterestInFostering'
import { AnyUnderSixteens, AboutUnderSixteens, AnyOverSixteens, AboutOverSixteens } from 'components/Pages/HomeVisit/8-ChildrenAwayFromHome'
import { AnyPeopleInYourHousehold, PeopleInYourHousehold, DoYouHaveAnyPets } from 'components/Pages/HomeVisit/10-YourHousehold'
import { YourGpDetails } from 'components/Pages/Application'
import { FamilyReference, FirstPersonalReference, SecondPersonalReference } from 'components/Pages/Application/3-YourReferences'
import { DoYouKnowCouncillors } from 'components/Pages/Application/4-CouncillorsOrEmployees'

export const START_PAGE = '/fostering/your-fostering-journey'
export const KNOWN_BY_ANOTHER_NAME = '/fostering/known-by-another-name'
export const MORE_ABOUT_YOU = '/fostering/more-about-you'
export const ARE_YOU_EMPLOYED = '/fostering/are-you-employed'
export const EMPLOYMENT_DETAILS = '/fostering/employment-details'
export const LANGUAGES_SPOKEN_IN_YOUR_HOME = '/fostering/languages-spoken-in-your-home'
export const PARTNERSHIP_STATUS = '/fostering/your-partnership-status'
export const DATE_OF_MARRIAGE_OR_PARTNERSHIP = '/fostering/date-of-marriage-or-partnership'
export const DATE_OF_MOVE_IN_TOGETHER = '/fostering/date-of-move-in'
export const FOSTERING_HISTORY = '/fostering/your-fostering-history'
export const ABOUT_YOUR_HEALTH = '/fostering/about-your-health'
export const YOUR_INTEREST_IN_FOSTERING = '/fostering/your-interest-in-fostering'
export const TYPES_OF_FOSTERING = '/fostering/types-of-fostering'
export const YOUR_HOUSEHOLD = '/fostering/your-household'
export const WHO_LIVES_IN_YOUR_HOME = '/fostering/who-lives-in-your-home'
export const DO_YOU_HAVE_ANY_PETS = '/fostering/do-you-have-any-pets'
export const CHILDREN_UNDER_SIXTEEN_LIVING_AWAY = '/fostering/children-under-sixteen-living-away'
export const ABOUT_CHILDREN_UNDER_SIXTEEN_LIVING_AWAY = '/fostering/about-children-under-sixteen-living-away'
export const CHILDREN_OVER_SIXTEEN_LIVING_AWAY = '/fostering/children-over-sixteen-living-away'
export const ABOUT_CHILDREN_OVER_SIXTEEN_LIVING_AWAY = '/fostering/about-children-over-sixteen-living-away'
export const ABOUT_YOUR_GP = '/fostering/about-your-gp'
export const FAMILY_REFERENCE = '/fostering/family-reference'
export const FIRST_PERSONAL_REFERENCE = '/fostering/first-personal-reference'
export const SECOND_PERSONAL_REFERENCE = '/fostering/second-personal-reference'
export const RELATIONSHIP_TO_COUNCIL_EMPLOYEES = '/fostering/relationship-to-council-employees'
export const ABOUT_RELATIONSHIP_TO_COUNCIL_EMPLOYEES = '/fostering/about-relationship-to-council-employees'

export const RouterConfig = [
    {
        path: START_PAGE,
        component: Start
    },
    {
        path: KNOWN_BY_ANOTHER_NAME,
        component: KnownByAnotherName,
        stage: StageName.HomeVisit,
        bothApplicants: true
    },
    {
        path: MORE_ABOUT_YOU,
        component: MoreAboutYou,
        stage: StageName.HomeVisit,
        bothApplicants: true
    },
    {
        path: ARE_YOU_EMPLOYED,
        component: AreYouEmployed,
        stage: StageName.HomeVisit,
        bothApplicants: true
    },
    {
        path: EMPLOYMENT_DETAILS,
        component: EmploymentDetails,
        stage: StageName.HomeVisit,
        bothApplicants: true
    },
    {
        path: LANGUAGES_SPOKEN_IN_YOUR_HOME,
        component: LanguagesSpokenInYourHome,
        stage: StageName.HomeVisit
    },
    {
        path: PARTNERSHIP_STATUS,
        component: AreYouMarried,
        stage: StageName.HomeVisit,
        jointApplicantOnly: true
    },
    {
        path: DATE_OF_MARRIAGE_OR_PARTNERSHIP,
        component: MarriageDate,
        stage: StageName.HomeVisit,
        jointApplicantOnly: true
    },
    {
        path: DATE_OF_MOVE_IN_TOGETHER,
        component: MovedInTogetherDate,
        stage: StageName.HomeVisit,
        jointApplicantOnly: true
    },
    {
        path: FOSTERING_HISTORY,
        component: HaveYouPreviouslyApplied,
        stage: StageName.HomeVisit,
        bothApplicants: true
    },
    {
        path: ABOUT_YOUR_HEALTH,
        component: YourHealth,
        stage: StageName.HomeVisit,
        bothApplicants: true
    },
    {
        path: YOUR_INTEREST_IN_FOSTERING,
        component: AboutYourInterest,
        stage: StageName.HomeVisit
    },
    {
        path: TYPES_OF_FOSTERING,
        component: TypesOfFostering,
        stage: StageName.HomeVisit
    },
    {
        path: YOUR_HOUSEHOLD,
        component: AnyPeopleInYourHousehold,
        stage: StageName.HomeVisit
    },
    {
        path: WHO_LIVES_IN_YOUR_HOME,
        component: PeopleInYourHousehold,
        stage: StageName.HomeVisit
    },
    {
        path: DO_YOU_HAVE_ANY_PETS,
        component: DoYouHaveAnyPets,
        stage: StageName.HomeVisit
    },
    {
        path: CHILDREN_UNDER_SIXTEEN_LIVING_AWAY,
        component: AnyUnderSixteens,
        stage: StageName.HomeVisit,
        bothApplicants: true
    },
    {
        path: ABOUT_CHILDREN_UNDER_SIXTEEN_LIVING_AWAY,
        component: AboutUnderSixteens,
        stage: StageName.HomeVisit,
        bothApplicants: true
    },
    {
        path: CHILDREN_OVER_SIXTEEN_LIVING_AWAY,
        component: AnyOverSixteens,
        stage: StageName.HomeVisit,
        bothApplicants: true
    },
    {
        path: ABOUT_CHILDREN_OVER_SIXTEEN_LIVING_AWAY,
        component: AboutOverSixteens,
        stage: StageName.HomeVisit,
        bothApplicants: true
    },
    {
        path: ABOUT_YOUR_GP,
        component: YourGpDetails,
        stage: StageName.Application,
        bothApplicants: true
    },
    {
        path: FAMILY_REFERENCE,
        component: FamilyReference,
        stage: StageName.Application
    },
    {
        path: FIRST_PERSONAL_REFERENCE,
        component: FirstPersonalReference,
        stage: StageName.Application
    },
    {
        path: SECOND_PERSONAL_REFERENCE,
        component: SecondPersonalReference,
        stage: StageName.Application
    },
    {
        path: RELATIONSHIP_TO_COUNCIL_EMPLOYEES,
        component: DoYouKnowCouncillors,
        stage: StageName.Application,
        bothApplicants: true
    }
]