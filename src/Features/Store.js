import { configureStore } from "@reduxjs/toolkit";
import newsSlice from "./NewsSlice"
import hellodoctorSlice from "./HelloDoctorSlice"
import postSlice from "./PostSlice"
import healthPackageSlice from "./HealthPackageSlice"
import departmentSlice from "./DepartmentSlice"
import treatmentInfoSlice from "./TreatmentInfoSlice"
import GastroIllnessSlice from "./GastroIllnessSlice"
import faqsSlice from "./FaqsSlice"
import featuresSlice from "./FeatureSlice"
import outstationClinicSlice from "./OutstationClinicSlice"
import discovereventSlice from "./DiscoverEventsCard"
import campSlice from "./CampSlice"
import doctorProfileSlice from "./DoctorProfileSlice"
import readingMaterialsSlice from "./ReadingMaterialsSlice"
import facilitySlice from "./FacilitySlice"
import technologySlice from "./TechnologySlice"
import blogSlice from "./BlogSlice"
import serviceSlice from "./ServiceSlice"
import termsSlice from "./TermsSlice"
import conditionWeTreatSlice from "./ConditionWeTreatSlice"
export default configureStore({
    reducer: {
        videos: hellodoctorSlice,
        post: postSlice,
        news: newsSlice,
        healthPackage: healthPackageSlice,
        department: departmentSlice,
        treatments: treatmentInfoSlice,
        gastroIllness: GastroIllnessSlice,
        faq: faqsSlice,
        features: featuresSlice,
        clinics: outstationClinicSlice,
        discoverevent: discovereventSlice,
        camps:campSlice,
        doctorProfiles:doctorProfileSlice,
        readingmaterials:readingMaterialsSlice,
        facility:facilitySlice,
        blog:blogSlice,
        service:serviceSlice,
        technology:technologySlice,
        term:termsSlice,

        conditionwetreat: conditionWeTreatSlice,
    },
});