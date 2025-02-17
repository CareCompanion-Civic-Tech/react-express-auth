const knex = require('../knex');

class Reviews {
    constructor({id, user_id, page_id, review_body, rating, staff_friendliness, wait_times, quality_of_care }){
        this.id = id;
        this.user_id = user_id;
        this.page_id = page_id;
        this.review_body = review_body;
        this.rating = rating;
        this.staff_friendliness = staff_friendliness;
        this.wait_times = wait_times;
        this.quality_of_care = quality_of_care;
    }
    static async create(user_id, page_id,review_body, rating, staff_friendliness, wait_times, quality_of_care ) {
        try {
    
          const query = `
          INSERT INTO reviews (user_id, page_id, review_body, rating, staff_friendliness, wait_times, quality_of_care)
            VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING *`;
          const { rows: [review] } = await knex.raw(query, [user_id, page_id,review_body, rating, staff_friendliness, wait_times, quality_of_care]);
          return new Reviews(review);
        } catch (err) {
          console.error(err);
          return null;
        }
      }
      static async find(id) {
        const query = `SELECT reviews.id, users.username, reviews.review_body, reviews.staff_friendliness, reviews.quality_of_care, reviews.wait_times ,reviews.rating, users.race, users.ethnicity, users.age, users.gender FROM reviews JOIN users ON reviews.user_id = users.id WHERE reviews.page_id = ?`;
        const { rows } = await knex.raw(query, [id]);
        return rows
      }
      static async list() {
        const query = 'SELECT * FROM reviews';
        const { rows } = await knex.raw(query);
        return rows.map((reviews) => new Reviews(reviews));
      }
      static async delete(id) {
        try {
          await knex.raw(`DELETE FROM reviews WHERE id = ?`, [Number(id)])
          const query = `DELETE FROM reviews WHERE id = ? RETURNING *;`
          const res = await knex.raw(query, [Number(id)]);
          return res.rows[0];
        } catch (err) {
          console.error(err);
          return null;
        }
      }

      update = async (review_body, rating) => { // dynamic queries are easier if you add more properties
        const [updatedReview] = await knex('reviews')
          .where({ id: this.id })
          .update({ review_body, rating})
          .returning('*');
        return updatedReview ? new  Reviews(updatedReview) : null;
      };
    

    }
    
module.exports = Reviews;