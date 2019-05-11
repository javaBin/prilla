import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

mock.onPost('/prilla/deltager').reply(200, {alreadyRegistered: false, alreadyAcceptedGDPR: false});
mock.onPost('/prilla/deltager/register').reply(204);
mock.onPost('/prilla/speaker').reply(204);
mock.onPost('/prilla/speaker/register').reply(204);


export default mock;
