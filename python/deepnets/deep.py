import IPython
import numpy as np
import theano
import theano.tensor as T


def softmax_and_loss():
    # corpus = read_sb5b_MulticlassCorpus(sort=True)
    # X, y = corpus
    # X = X.tocsr()


    # generate symbolic variables for input (x and y represent a
    # minibatch)
    x = T.fmatrix('x')
    y = T.lvector('y')

    # allocate shared variables model params
    b = theano.shared(np.zeros((10,)), name='b')
    W = theano.shared(np.zeros((784, 10)), name='W')

    # symbolic expression for computing the vector of
    # class-membership probabilities
    p_y_given_x = T.nnet.softmax(T.dot(x, W) + b)

    # compiled Theano function that returns the vector of class-membership
    # probabilities
    get_p_y_given_x = theano.function(inputs=[x], outputs=p_y_given_x)

    # print the probability of some example represented by x_value
    # x_value is not a symbolic variable but a numpy array describing the
    # datapoint
    print 'Probability that x is of class %i is %f' % (i, get_p_y_given_x(x_value)[i])

    # symbolic description of how to compute prediction as class whose probability
    # is maximal
    y_pred = T.argmax(p_y_given_x, axis=1)

    # compiled theano function that returns this value
    classify = theano.function(inputs=[x], outputs=y_pred)


    loss = -T.mean(T.log(p_y_given_x)[T.arange(y.shape[0]), y])
    # note on syntax: T.arange(y.shape[0]) is a vector of integers [0,1,2,...,len(y)].
    # Indexing a matrix M by the two vectors [0,1,...,K], [a,b,...,k] returns the
    # elements M[0,a], M[1,b], ..., M[K,k] as a vector.  Here, we use this
    # syntax to retrieve the log-probability of the correct labels, y.


class LogisticRegression(object):

    def __init__(self, input, n_in, n_out):
        """ Initialize the parameters of the logistic regression

        :type input: theano.tensor.TensorType
        :param input: symbolic variable that describes the input of the
                      architecture (e.g., one minibatch of input images)

        :type n_in: int
        :param n_in: number of input units, the dimension of the space in
                     which the datapoint lies

        :type n_out: int
        :param n_out: number of output units, the dimension of the space in
                      which the target lies
        """
        # initialize with 0 the weights W as a matrix of shape (n_in, n_out)
        self.W = theano.shared(value=np.zeros((n_in, n_out),
                                            dtype=theano.config.floatX), name='W')
        # initialize the baises b as a vector of n_out 0s
        self.b = theano.shared(value=np.zeros((n_out,),
                                            dtype=theano.config.floatX), name='b')

        # compute vector of class-membership probabilities in symbolic form
        self.p_y_given_x = T.nnet.softmax(T.dot(input, self.W) + self.b)

        # compute prediction as class whose probability is maximal in
        # symbolic form
        self.y_pred = T.argmax(self.p_y_given_x, axis=1)


    def negative_log_likelihood(self, y):
        """Return the mean of the negative log-likelihood of the prediction
        of this model under a given target distribution.

        .. math::

          \frac{1}{|\mathcal{D}|} \mathcal{L} (\theta=\{W,b\}, \mathcal{D}) =
          \frac{1}{|\mathcal{D}|} \sum_{i=0}^{|\mathcal{D}|} \log(P(Y=y^{(i)}|x^{(i)}, W,b)) \\
              \ell (\theta=\{W,b\}, \mathcal{D})


        :param y: corresponds to a vector that gives for each example the
                  correct label;

        Note: we use the mean instead of the sum so that
              the learning rate is less dependent on the batch size
        """
        return -T.mean(T.log(self.p_y_given_x)[T.arange(y.shape[0]), y])

def theano1(analysis_options):

    x = T.fmatrix()  # the data is presented as rasterized images (each being a 1-D row vector in x)
    y = T.lvector()  # the labels are presented as 1D vector of [long int] labels

    # construct the logistic regression class
    classifier = LogisticRegression(
        input=x.reshape((batch_size, 28 * 28)), n_in=28 * 28, n_out=10)

    cost = classifier.negative_log_likelihood(y)

    # compute the gradient of cost with respect to theta = (W,b)
    g_W = T.grad(cost, classifier.W)
    g_b = T.grad(cost, classifier.b)


    IPython.embed() and exit()
