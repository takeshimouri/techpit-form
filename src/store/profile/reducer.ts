import { reducerWithInitialState } from "typescript-fsa-reducers";
import { Profile } from "../../domain/entity/profile";
import profileActions from "./actions";
import { Career } from "../../domain/entity/career";

const init: Profile = {
  name: "",
  description: "",
  birthday: "",
  gender: "",
  address: {
    postalcode: "",
    prefecture: "",
    town: "",
    restAddress: ""
  },
  college: {
    name: "",
    faculty: "",
    department: ""
  },
  career: []
};

const initCareer: Career = {
  company: "",
  position: "",
  startAt: "",
  endAt: ""
};

const profileReducer = reducerWithInitialState(init)
  .case(profileActions.setProfile, (state, payload) => ({
    ...state,
    ...payload
  }))
  .case(profileActions.setAddress, (state, payload) => ({
    ...state,
    address: { ...state.address, ...payload }
  }))
  .case(profileActions.setCollege, (state, payload) => ({
    ...state,
    college: { ...state.college, ...payload }
  }))
  .case(profileActions.addCareer, state => ({
    ...state,
    career: [...state.career, initCareer]
  }))
  .case(profileActions.setCareer, (state, payload) => ({
    ...state,
    career: state.career.map((c, i) =>
      i === payload.index ? { ...c, ...payload.career } : c
    )
  }))
  .case(profileActions.deleteCareer, (state, payload) => ({
    ...state,
    career: state.career.filter((_, i) => i !== payload)
  }))
  .case(profileActions.searchAddress.done, (state, payload) => ({
    ...state,
    address: { ...state.address, ...payload.result }
  }));

export default profileReducer;
