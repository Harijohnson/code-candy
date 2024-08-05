import random
import re

# List of root words (this can be expanded or loaded from a file)
root_words = ['con', 'struct', 'form', 'trans', 'port', 'in', 'ject', 'pre', 'post']

# Define a list of regex patterns to generate new words
patterns = [
    r'^[a-z]{3}con[a-z]{2}',   # Pattern example: Starts with 3 letters, followed by 'con', ends with 2 letters
    r'^[a-z]{2}form[a-z]{3}',  # Pattern example: Starts with 2 letters, followed by 'form', ends with 3 letters
    r'^[a-z]{4}ject[a-z]{2}'   # Pattern example: Starts with 4 letters, followed by 'ject', ends with 2 letters
]

def generate_word_from_pattern(pattern, root_words):
    """Generate a word that matches the regex pattern using the list of root words."""
    # Generate a random word that fits the pattern
    while True:
        word = ''.join(random.choices('abcdefghijklmnopqrstuvwxyz', k=5))  # Generate a base random word
        for root in root_words:
            if re.match(pattern, word + root):  # Check if the word with a root fits the pattern
                return word + root

def generate_meaningful_words(num_words, patterns, root_words):
    """Generate a list of meaningful words based on patterns and root words."""
    return [generate_word_from_pattern(random.choice(patterns), root_words) for _ in range(num_words)]

# Example usage
mean_words = generate_meaningful_words(10, patterns, root_words)
print(mean_words)
