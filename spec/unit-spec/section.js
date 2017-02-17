require('should');
const supertest = require("supertest");
const app = require("../../app");
const Section = require("../../model/section");
const constant = require("../../config/constant");
const request = supertest(app);

describe('SectionCtroller', (done)=> {
  it('GET /sections', (done)=> {
    request
        .get('/sections')
        .expect(constant.httpCode.OK)
        .expect((res)=> {
          res.body.totalCount.should.equal(2);
        })
        .end(done);
  });

  it('GET /sections/:sectionId should return a section', (done)=> {
    const sectionId = '577f0f2586653d19297d40b1';
    request
        .get(`/sections/${sectionId}`)
        .expect(constant.httpCode.OK)
        .expect((res)=> {
          res.body.should.deepEqual({
            "_id": "577f0f2586653d19297d40b1",
            "name": "逻辑题",
            "paper": {
              "_id": "577f0f2586653d19297d40c1",
              "title": "一年级试卷",
              "description": "期中考试",
              "__v": 0
            },
            "__v": 0,
            "homeworks": [
              {
                "_id": "577f0f2586653d19297d40a1",
                "name": "题目一",
                "description": "这是一道计算题",
                "__v": 0
              },
              {
                "_id": "577f0f2586653d19297d40a2",
                "name": "题目二",
                "description": "这是一道简答题",
                "__v": 0
              },
              {
                "_id": "577f0f2586653d19297d40a3",
                "name": "题目三",
                "description": "这是一道逻辑题",
                "__v": 0
              }
            ]
          })
        })
        .end(done);
  });

  it('POST /sections should return 201', (done)=> {
    const section = {
      "name": "解答题ｔｅｓｔ",
      "paper": "577f0f2586653d19297d40c1",
      "homeworks": [
        "577f0f2586653d19297d40a1"
      ]
    };
    request
        .post('/sections')
        .send(section)
        .expect(constant.httpCode.CREATE)
        .end(done);
  });
});

it('DELETE /section/:sectioId should return 204', (done)=>{
  const sectionId  = '577f0f2586653d19297d40b1';
  request
      .delete(`/sections/${sectionId}`)
      .expect(constant.httpCode.NO_CONTENT)
      .end(done);
});

it('PUT /sections/:sectioId should return 204', (done)=>{
  const sectionId = '577f0f2586653d19297d40b1';
  const name = {name:'简答题'};
  request
      .put(`/sections/${sectionId}`)
      .send(name)
      .expect(constant.httpCode.NO_CONTENT)
      .end(done);
});