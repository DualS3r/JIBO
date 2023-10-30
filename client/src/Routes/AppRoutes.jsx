import { useContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { JiboContext } from "../Context/JiboContext";
import { NavbarJibo } from "../Components/NavbarJibo/NavbarJibo";
import { NavbarUserJibo } from "../Components/NavbarJibo/NavbarUserJibo";
import { Home } from "../Pages/Dashboard/home/Home";
import { HomeCompany } from "../Pages/Dashboard/HomeCompany/HomeCompany";
import { HomeWorker } from "../Pages/Dashboard/HomeWorker/HomeWorker";
import { Disclaimer } from "../Pages/Dashboard/Disclaimer";
import { CookiePolicy } from "../Pages/Dashboard/CookiePolicy";
import { PrivacyPolicy } from "../Pages/Dashboard/PrivacyPolicy";
import { Error } from "../Pages/Error/Error";
import { WorkerProfile } from "../Pages/UserProfile/WorkerProfile";
import { PersonalData } from "../Components/Main/WorkerProfile/PersonalData/PersonalData";
import { OtherData } from "../Components/Main/WorkerProfile/OtherData/OtherData";
import { Curriculum } from "../Components/Main/WorkerProfile/Curriculum/Curriculum";
import { JobPreferences } from "../Components/Main/WorkerProfile/JobPreferences/JobPreferences";
import { ActiveOffersReceived } from "../Components/Main/WorkerProfile/OffersReceived/ActiveOffersReceived";
import { OffersApply } from "../Components/Main/WorkerProfile/OffersApply/OffersApply";
import { CompanyProfile } from "../Pages/UserProfile/CompanyProfile";
import { CompanyData } from "../Components/Main/ProfileCompany/CompanyData/CompanyData";
import { ActiveOffers } from "../Components/Main/ProfileCompany/ActiveOffers/ActiveOffers";
import { BuyVoucher } from "../Components/Main/ProfileCompany/BuyVoucher/BuyVoucher";
import { CompletedOffers } from "../Components/Main/ProfileCompany/CompletedOffers/CompletedOffers";
import { ViewAppliers } from "../Components/Main/ProfileCompany/ActiveOffers/ViewAppliers/ViewAppliers";
import { CompanyProfileViewer } from "../Pages/UserProfile/CompanyProfileViewer";
import { ApplierPersonalData } from "../Components/Main/ApplierProfile/ApplierPersonalData/ApplierPersonalData";
import { ApplierOtherData } from "../Components/Main/ApplierProfile/ApplierOtherData/ApplierOtherData";
import { ApplierJobPreferences } from "../Components/Main/ApplierProfile/ApplierJobPreferences/ApplierJobPreferences";
import { ApplierCurriculum } from "../Components/Main/ApplierProfile/ApplierCurriculum/ApplierCurriculum";
import { SearchView } from "../Pages/Dashboard/Search/SearchView";
import { AllWorkers } from "../Components/Main/Filters/AllWorkers";
import { AllOffers } from "../Components/Main/Filters/AllOffers";
import { AllCompany } from "../Components/Main/Filters/AllCompany";
import { AdminProfile } from "../Pages/Admin/AdminProfile";
import { EditRoles } from "../Components/Main/AdminProfile/EditRoles";
import { FooterJibo } from "../Components/FooterJibo/FooterJibo";
import { Container, Row } from "react-bootstrap";
import "../Style/general.scss";

export const AppRoutes = () => {
  const { isLogged, token, userType } = useContext(JiboContext);
  const [filter, setFilter] = useState(0);
  const [filterList, setFilterList] = useState([]);

  return (
    <Container fluid>
      <Row>{!isLogged ? <NavbarJibo /> : <NavbarUserJibo />}</Row>
      <Row className="minHeight">
        <Routes>
          <>
            {!isLogged && (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/company" element={<HomeCompany />} />
                <Route path="/worker" element={<HomeWorker />} />
              </>
            )}

            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/cookiePolicy" element={<CookiePolicy />} />
            <Route path="*" element={<Error />} />

            {((token && userType === 0) || (token && userType === 1)) && (
              <Route
                path="/workerProfile/:worker_id"
                element={<WorkerProfile />}
              >
                <Route index element={<PersonalData />} />
                <Route path="otherData" element={<OtherData />} />
                <Route path="curriculum" element={<Curriculum />} />
                <Route path="jobPreferences" element={<JobPreferences />} />
                <Route
                  path="offersReceived/:company_id"
                  element={<ActiveOffersReceived />}
                />
                <Route path="offersApply" element={<OffersApply />} />
              </Route>
            )}
            {((token && userType === 0) || (token && userType === 2)) && (
              <>
                <Route
                  path="/companyProfile/:company_id"
                  element={<CompanyProfile />}
                >
                  <Route index element={<CompanyData />} />
                  <Route path="buyVoucher" element={<BuyVoucher />} />
                  <Route path="activeOffers" element={<ActiveOffers />} />
                  <Route path="completedOffers" element={<CompletedOffers />} />
                  <Route path="viewAppliers" element={<ViewAppliers />} />
                </Route>

                <Route
                  path="/viewApplierProfile/:worker_id"
                  element={<CompanyProfileViewer />}
                >
                  <Route index element={<ApplierPersonalData />} />
                  <Route
                    path="applierOtherData"
                    element={<ApplierOtherData />}
                  />
                  <Route
                    path="applierJobPreferences"
                    element={<ApplierJobPreferences />}
                  />
                  <Route
                    path="applierCurriculum"
                    element={<ApplierCurriculum />}
                  />
                </Route>
              </>
            )}

            <Route
              path="/search"
              element={
                <SearchView
                  setFilterList={setFilterList}
                  filterList={filterList}
                  filter={filter}
                />
              }
            >
              {((token && userType === 0) || (token && userType === 2)) && (
                <Route
                  path="allWorkers"
                  element={
                    <AllWorkers
                      setFilterList={setFilterList}
                      filterList={filterList}
                      setFilter={setFilter}
                    />
                  }
                />
              )}
              {((token && userType === 0) || (token && userType === 1)) && (
                <Route
                  path="allOffers"
                  element={
                    <AllOffers
                      setFilterList={setFilterList}
                      filterList={filterList}
                      setFilter={setFilter}
                    />
                  }
                />
              )}
              {token && userType === 0 && (
                <Route
                  path="allCompany"
                  element={
                    <AllCompany
                      setFilterList={setFilterList}
                      filterList={filterList}
                      setFilter={setFilter}
                    />
                  }
                />
              )}
            </Route>

            {token && userType === 0 && (
              <>
                <Route path="/admin" element={<AdminProfile />} />
                <Route path="/admin/editRoles" element={<EditRoles />} />
              </>
            )}
          </>
        </Routes>
      </Row>
      <Row>
        <FooterJibo />
      </Row>
    </Container>
  );
};
