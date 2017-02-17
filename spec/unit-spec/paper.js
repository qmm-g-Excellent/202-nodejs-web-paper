require('should');
const supertest = require("supertest");
const app = require("../../app");
const Paper = require("../../model/paper");
const request = supertest(app);
const constant = require("../../config/constant");

describe('PaperController', ()=>{
  it('GET /papers should return papers', (done)=>{
    request
        .get('/papers')
        .expect(constant.httpCode.OK)
        .expect((res)=>{
           res.body.totalCount.should.eql(3);
        })
        .end(done);
  });

  it('GET /papers/:paperId return a paper', (done)=>{
    const paperId = '577f0f2586653d19297d40c2';
    request
        .get(`/papers/${paperId}`)
        .expect(constant.httpCode.OK)
        .expect((res)=>{
           res.body.should.deepEqual({
             "_id": "577f0f2586653d19297d40c2",
             "title": "二年级试卷",
             "description": "期末考试",
             "__v": 0
           });
        })
        .end(done);
  });

  it('POST /papers', (done)=>{
    const paper = {
      "title": "四年级试卷－－ｓｐｅｃ",
      "description": "期末考试－－－ｓｐｅｃ"
    }
    request
        .post('/papers')
        .send(paper)
        .expect(constant.httpCode.CREATE)
        .end(done);
  });

  it('DELETE /papers/:paperId should return 204', (done)=>{
    const paperId = '577f0f2586653d19297d40c3';
    request
        .delete(`/papers/${paperId}`)
        .expect(constant.httpCode.NO_CONTENT)
        .end(done);
  });

  it('PUT /papers/:paperId should return 204', (done)=>{
    const paperId = '577f0f2586653d19297d40c3';
    const paper = {
      "title": "putput年级试卷",
      "description": "puputput期末考试"
    };
    request
        .put(`/papers/${paperId}`)
        .send(paper)
        .expect(constant.httpCode.NO_CONTENT)
        .end(done);
  });
});
