INSERT INTO categories(name) VALUES
('Home Services'),('Healthcare'),('Automotive'),('Professional'),('Emergency'),
('Technology'),('Education'),('Food & Dining'),('Shopping'),('Entertainment'),
('Hotels & Stay'),('Lifestyle')
ON CONFLICT DO NOTHING;
