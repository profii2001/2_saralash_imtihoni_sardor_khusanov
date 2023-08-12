

const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ user_id: req.user.id });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createFeedback = async (req, res) => {
  try {
    const { title, message } = req.body;
    if (!title || !message) {
      res.status(400).json({ error: 'Title and message are need' });
      return;
    }
    
    const feedback = await Feedback.create({
      title,
      message,
      user_id: req.user.id,
    });

    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

const getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      res.status(404).json({ error: 'Feedback not found' });
      return;
    }
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

const updateFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      res.status(404).json({ error: 'Feedback not found' });
      return;
    }

    if (feedback.user_id.toString() !== req.user.id) {
      res.status(403).json({ error: 'User does not have permission' });
      return;
    }

    const updatedFeedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedFeedback);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      res.status(404).json({ error: 'Feedback not found' });
      return;
    }
    
    if (feedback.user_id.toString() !== req.user.id) {
      res.status(403).json({ error: 'User does not have permission' });
      return;
    }

    await Feedback.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = {
  getFeedbacks,
  createFeedback,
  getFeedback,
  updateFeedback,
  deleteFeedback,
};
